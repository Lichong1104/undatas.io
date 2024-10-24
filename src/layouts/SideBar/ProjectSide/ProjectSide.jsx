import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function ProjectSide() {
  const project = useSelector((state) => state.currentProject.project);
  return (
    <MainBox>
      <div>{project.task_name}</div>
      <img src={project.image_path} alt="" />
      <p>
        {project.license} {project.num} dataset
      </p>
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #80808046;
  padding-bottom: 12px;
  > div {
    font-size: 16px;
    font-weight: 600;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 2px;
  }
  img {
    width: 100%;
    height: 130px;
    border-radius: 12px;
  }
  > p {
    font-size: 12px;
    color: #808080d6;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }
`;

export default ProjectSide;
