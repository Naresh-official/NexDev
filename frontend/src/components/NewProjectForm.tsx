"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostApi } from "@/hooks/usePostApi";

const formVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.5 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

interface INewProjectForm {
	name: string;
	description: string;
}

export function NewProjectForm() {
	const router = useRouter();
	const { data, error, loading, postData } = usePostApi<
		INewProjectForm,
		{ _id: string }
	>();
	const [formData, setFormData] = useState<INewProjectForm>({
		name: "",
		description: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isFormValid) {
			await postData("/project", formData);
		}
		if (data?._id) {
			router.push(`/project/${data._id}`);
		}
	};

	const isFormValid = formData.name && formData.description;

	if (!loading && error) {
		return (
			<div className="flex justify-center items-center w-full mx-auto">
				<h1 className="text-2xl text-red-600 font-mono">
					<span className="font-bold">Error : </span>
					{error}
				</h1>
			</div>
		);
	}

	return (
		<motion.form
			onSubmit={handleSubmit}
			variants={{
				hidden: { opacity: 0, y: 30, scale: 0.5 },
				visible: {
					opacity: 1,
					y: 0,
					scale: 1,
					transition: { duration: 0.5, ease: "easeOut" },
				},
			}}
			initial="hidden"
			animate="visible"
			className="space-y-8"
		>
			<div className="space-y-4">
				<motion.div variants={formVariants} className="space-y-2">
					<Label htmlFor="name">Project Name</Label>
					<Input
						id="name"
						name="name"
						placeholder="e.g., My Portfolio Website"
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
				</motion.div>
				<motion.div variants={formVariants} className="space-y-2">
					<Label htmlFor="description">Project Description</Label>
					<Textarea
						id="description"
						name="description"
						rows={8}
						placeholder="Describe the purpose and functionality of your project."
						value={formData.description}
						className="resize-none"
						onChange={handleInputChange}
						required
					/>
					<p className="text-sm text-gray-500 mt-1">
						Include key features, target audience, and any specific
						requirements.
					</p>
				</motion.div>
			</div>
			<Button
				type="submit"
				disabled={!isFormValid || loading}
				className="w-full"
			>
				{loading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Generating Project...
					</>
				) : (
					"Generate Project"
				)}
			</Button>
		</motion.form>
	);
}
