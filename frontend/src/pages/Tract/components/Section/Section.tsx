import { ReactNode } from "react";
import "./section.sass";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="section">
    <p className="title">{title}</p>
    <div className="content">{children}</div>
  </div>
);

export default Section;
