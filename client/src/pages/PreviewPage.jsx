import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { getStudentSummary } from "../services/summaryService";
import { useParams } from "react-router-dom";

const PreviewPage = () => {
  const { years, studentId } = useParams();

  const [transfer, setTransfer] = useState(null);

  useEffect(() => {
    getStudentSummary(1).then((res) => setTransfer(res.data));
  }, []);

  if (!transfer) return <div>Loading...</div>;

  const grouped = {};
  let groupCounter = 1;

  transfer.annualCourse.subjects.forEach((s) => {
    const groupName = s.subject.subGroup.nameSubject;

    if (!grouped[groupName]) {
      grouped[groupName] = {
        autoNumber: groupCounter++,
        subjects: [],
        groupInfo: s.subject.subGroup,
      };
    }
    grouped[groupName].subjects.push(s.subject);
  });

  Object.keys(grouped).forEach((groupName) => {
    grouped[groupName].subjects.forEach((subject, index) => {
      subject.inGroupNumber = index + 1;
    });
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
            cellPadding="8"
            cellSpacing="0"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  รหัสกลุ่ม
                </th>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  ชื่อกลุ่ม
                </th>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  หน่วยกิต
                </th>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  กลุ่มเทียบ
                </th>
                <th colSpan="3" style={{ padding: "12px" }}>
                  รายวิชาที่ขอเทียบโอน (จะต้องได้เกรด C หรือ 2 ขึ้นไป)
                </th>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  เกรด
                </th>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  เลือก
                  <br />
                  (✓)
                </th>
                <th rowSpan="2" style={{ padding: "12px" }}>
                  เอกสารระบบ
                  <br />
                  CE
                </th>
              </tr>
              <tr>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>หน่วยกิต</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([groupName, groupData]) =>
                groupData.subjects.map((subj, idx) => {
                  const grade = gradeMap[subj.id];
                  const isValidGrade = grade && grade >= 2;
                  return (
                    <tr key={subj.id}>
                      {idx === 0 && (
                        <td
                          rowSpan={groupData.subjects.length}
                          style={{
                            padding: "8px",
                            verticalAlign: "top",
                            textAlign: "left",
                          }}
                        >
                          {groupData.groupInfo.codeSubject}
                        </td>
                      )}
                      {idx === 0 && (
                        <td
                          rowSpan={groupData.subjects.length}
                          style={{
                            padding: "8px",
                            verticalAlign: "top",
                            textAlign: "left",
                          }}
                        >
                          {groupName}
                        </td>
                      )}
                      <td style={{ padding: "8px" }}>{subj.subUnit}</td>
                      <td style={{ padding: "8px" }}>{subj.inGroupNumber}</td>
                      <td style={{ padding: "8px" }}>{subj.subId}</td>
                      <td style={{ padding: "8px", textAlign: "left" }}>
                        {subj.subName}
                      </td>
                      <td>{subj.subUnit}</td>
                      <td>{grade ?? "-"}</td>
                      <td>{isValidGrade ? "✓" : ""}</td>
                      <td>CE</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: "#f9f9f9",
              borderRadius: 5,
            }}
          >
            <h3>สรุปกลุ่มวิชา</h3>
            {Object.entries(grouped).map(([groupName, groupData]) => (
              <div key={groupName}>
                <strong>กลุ่มที่ {groupData.autoNumber}:</strong>{" "}
                {groupData.groupInfo.codeSubject} - {groupName}
                <span> ({groupData.subjects.length} วิชา)</span>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default PreviewPage;
