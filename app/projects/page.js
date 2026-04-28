import ProjectsIndex from "../components/projects";

export const metadata = {
  title: "Projects — Hardik Saini",
  description:
    "Selected projects by Hardik Saini — products, prototypes, and AI-driven tools designed for real users.",
};

export default function ProjectsPage() {
  return (
    <div suppressHydrationWarning>
      <ProjectsIndex />
    </div>
  );
}
