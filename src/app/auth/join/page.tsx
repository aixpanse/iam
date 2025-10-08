"use client";
import FormError from "@/components/form-error";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { useRestCreate } from "@/hooks/use-rest";
import { SESSION_ID } from "@/lib/auth/consts";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function JoinPage() {
  const useJoin = useRestCreate('/api/join');
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  const sessionId = searchParams.get('sessionId');
  const domain = redirectUrl?.startsWith('http') ? (new URL(redirectUrl)).hostname : undefined;
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleNo = () => {
    router.back();
  };

  const handleYes = async () => {
    setLoading(true);
    const session = await getCookie(SESSION_ID);
    useJoin.mutate({ sessionId, domain }, {
      onSuccess: (response) => {
        setLoading(false);
        if (response.error) {
          setError(response.error);
        } else {
          router.push(`${redirectUrl}?session=${session}`);
        }
      },
      onError: (error) => {
        setError(error.message);
        setLoading(false);
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Do you want to add your account to <span className="font-normal">{domain}</span>?
        </h1>
      </div>
      <FormError
        hide={!error}
        title="Unable to add your account"
        description={error || undefined}
      />
      <div className="flex gap-4 justify-center">
        <Button variant="outline" className="w-25" onClick={handleNo}>No</Button>
        <SubmitButton
          loading={loading}
          disabled={false}
          label="Yes"
          className="w-25"
          onClick={handleYes}
        />
      </div>
    </div>
  )
}

