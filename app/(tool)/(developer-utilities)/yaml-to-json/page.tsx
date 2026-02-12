import { Metadata } from "next";
import YamlToJsonClient from "./client";

export const metadata: Metadata = {
  title: "YAML & JSON Converter | ToolBits",
  description:
    "Convert YAML to JSON and JSON to YAML instantly. Validate and format your configuration files with our free online converter.",
};

export default function YamlToJsonPage() {
  return <YamlToJsonClient />;
}
