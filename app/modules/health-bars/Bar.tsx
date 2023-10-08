import { ConfigProvider, Progress, Typography } from "antd";
import { useEffect, useState } from "react";
import { isBrowser } from "@/app/modules/utils";
import { getHealthColor } from "@/app/modules/health-bars/utils";

interface IProps {
	title: string;
	percentage: number;
}
export const Bar = ({ title, percentage }: IProps) => {
	const [progressBarSize, setprogressBarSize] = useState(20);
	useEffect(() => {
		if (isBrowser()) {
			setprogressBarSize(window.innerHeight / 15);
		}
	});
	const realPercentage = percentage > 100 ? 100 : percentage;

	return (
		<div className="m-1 flex-shrink rounded-2xl px-3 text-center">
			<ConfigProvider
				theme={{
					components: {
						Progress: {
							colorText: "foreground",
						},
					},
				}}
			>
				<Progress
					size={progressBarSize}
					type="circle"
					percent={percentage}
					strokeColor={getHealthColor(
						realPercentage,
					)}
					trailColor={
						"rgba(120,120,120,0.5)"
					}
				/>
			</ConfigProvider>
			<Typography.Text
				style={{
					textAlign: "center",
					display: "block",
					marginTop: "20px",
				}}
				className="text-foreground"
			>
				{title}
			</Typography.Text>
		</div>
	);
};
