"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { IssueSchema, IssueForm } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

// Load SimpleMDE without SSR
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function IssueForms({ issue }: { issue?: Issue }) {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      // for /Issues/new (no issue) these are empty
      title: issue?.title ?? "",
      description: issue?.description ?? "",
    },
  });

  // Important: when issue is passed (edit page), sync it into the form
  useEffect(() => {
    if (issue) {
      reset({
        title: issue.title,
        description: issue.description,
      });
    }
  }, [issue, reset]); // standard pattern for pre-filling edit forms [web:73][web:60][web:79]

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Same behavior as before: always POST to create
      await axios.post("/api/issues", data);
      router.push("/Issues");
    } catch (err) {
      setIsSubmitting(false);
      setError("Unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl space-y-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Text as="label" size="2">
            Title
          </Text>
          <TextField.Root
            {...register("title")}
            placeholder="Issue title"
            className="w-full"
          />
          {errors.title && (
            <ErrorMessage>{errors.title.message as string}</ErrorMessage>
          )}
        </div>

        <div>
          <Text as="label" size="2">
            Description
          </Text>

          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description ?? ""}
            render={({ field }) => (
              <SimpleMDE
                key="simplemde"
                value={field.value}
                onChange={field.onChange}
                options={{ spellChecker: false }}
              />
            )}
          />

          {errors.description && (
            <ErrorMessage>
              {errors.description.message as string}
            </ErrorMessage>
          )}
        </div>

        {/* Button code unchanged */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          <span className="ml-2">Submit New Issue</span>
        </Button>
      </form>
    </div>
  );
}

export default IssueForms;
