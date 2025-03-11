"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { v4 as uuidv4 } from "uuid";

interface MermaidProps {
	chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
	const ref = useRef<HTMLDivElement>(null);
	const chartId = useRef(`mermaid-chart-${uuidv4()}`);

	useEffect(() => {
		mermaid.initialize({
			startOnLoad: true,
			securityLevel: "loose",
			theme: "neutral",
		});

		if (ref.current) {
			mermaid
				.render(chartId.current, chart)
				.then(({ svg }) => {
					if (ref.current) {
						ref.current.innerHTML = svg;
					}
				})
				.catch((error) => {
					console.error("Mermaid rendering error:", error);
				});
		}
	}, [chart]);

	return <div className="mermaid-wrapper" ref={ref} />;
}
