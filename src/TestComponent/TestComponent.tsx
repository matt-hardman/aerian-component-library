import React from "react";

interface TestComponentProps {
  theme: "primary" | "secondary";
}

import styles from "./TestComponent.module.scss";

console.log(styles);

const TestComponent: React.FC<TestComponentProps> = ({ theme }) => (
  <div className={styles.testComponent}>
    <h1 className="heading">I'm the test component</h1>
    <h2>Made with love by Harvey</h2>
  </div>
);

export default TestComponent;
