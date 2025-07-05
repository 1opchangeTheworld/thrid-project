import { useEffect, useState } from "react";
import { getStudentSummary } from "../services/summaryService";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const PreviewPage = () => {
  const [transfer, setTransfer] = useState(null);

  useEffect(() => {
    getStudentSummary(1).then((res) => setTransfer(res.data));
  }, []);

  if (!transfer) return <div>Loading...</div>;

  const grouped = {};
  transfer.annualCourse.subjects.forEach((s) => {
    const groupName = s.subject.subGroup.name;
    if (!grouped[groupName]) grouped[groupName] = { BASE: [], TRANSFER: [] };
    grouped[groupName][s.type].push(s);
  });

  const gradeMap = {};
  transfer.grades.forEach((g) => {
    gradeMap[g.subjectId] = g.grade;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={{ padding: 20 }}>
          <h2>ตารางเทียบรายวิชา</h2>
          <table
            border="1"
            cellPadding="2"
            cellSpacing="0"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "8px",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                {/* เอา <th rowSpan="2">กลุ่ม</th> ออก */}
                <th rowSpan="2">รหัสวิชา</th>
                <th rowSpan="2">ชื่อวิชา</th>
                <th rowSpan="2">หน่วยกิต</th>
                <th colSpan="4">รายวิชาที่ขอเทียบโอน</th>
                <th rowSpan="2">เกรด</th>
                <th rowSpan="2">เลือก</th>
                <th rowSpan="2">เอกสาร</th>
              </tr>
              <tr>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>หน่วยกิต</th>
                <th>กลุ่ม</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(grouped).map((group) => {
                const baseSubjects = grouped[group].BASE;
                const transferSubjects = grouped[group].TRANSFER;

                return baseSubjects.map((base, idx) => {
                  const matchedTransfers = transferSubjects.filter(
                    (ts) => ts.groupId === base.groupId
                  );

                  const rowspan = matchedTransfers.length || 1;

                  return matchedTransfers.length > 0 ? (
                    matchedTransfers.map((transfer, transferIdx) => (
                      <tr
                        key={`${base.subjectId}-${transfer?.subjectId}-${transferIdx}`}
                      >
                        {transferIdx === 0 && (
                          <>
                            <td rowSpan={rowspan}>{base.subject.subId}</td>
                            <td rowSpan={rowspan}>{base.subject.subName}</td>
                            <td rowSpan={rowspan}>{base.subject.subUnit}</td>
                          </>
                        )}

                        <td>{transfer.subject.subId}</td>
                        <td>{transfer.subject.subName}</td>
                        <td>{transfer.subject.subUnit}</td>
                        <td>{transfer.subject.subGroup.name}</td>

                        <td>{gradeMap[transfer.subjectId] || "-"}</td>

                        {transferIdx === 0 && (
                          <>
                            <td rowSpan={rowspan}>
                              {matchedTransfers.some(
                                (t) => gradeMap[t.subjectId]
                              ) && "✓"}
                            </td>
                            <td rowSpan={rowspan}>CE</td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr key={`${base.subjectId}-empty`}>
                      <td>{base.subject.subId}</td>
                      <td>{base.subject.subName}</td>
                      <td>{base.subject.subUnit}</td>
                      <td colSpan={4}>-</td>
                      <td>-</td>
                      <td>✓</td>
                      <td>CE</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
};

export default PreviewPage;
