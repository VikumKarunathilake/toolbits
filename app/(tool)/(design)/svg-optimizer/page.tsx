import { Metadata } from "next";
import SvgOptimizerClient from "./client";

export const metadata: Metadata = {
  title: "SVG Optimizer",
  description:
    "Minify and optimize SVG code online. Reduce file size by removing metadata, comments, and unused attributes.",
};

export default function SvgOptimizerPage() {
  return <SvgOptimizerClient />;
}
