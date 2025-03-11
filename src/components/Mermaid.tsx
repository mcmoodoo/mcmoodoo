"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
	chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		mermaid.initialize({ startOnLoad: true });
		if (ref.current) {
			mermaid.render("mermaid-chart", chart).then(({ svg }) => {
				ref.current!.innerHTML = svg;
			});
		}
	}, [chart]);

	return <div ref={ref} />;
}
