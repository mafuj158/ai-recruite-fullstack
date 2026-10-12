"use client";

import { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import {
  FiAward,
  FiPlus,
  FiTrash2,
  FiExternalLink,
} from "react-icons/fi";
import { LuX } from "react-icons/lu";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  CandidateProfileValues,
  CertificationItem,
  CertificationFormValues,
} from "@/types/candidate/profile.types";

interface CandidateCertificationsSectionProps {
  certifications: CertificationItem[];
  onChange: (field: keyof CandidateProfileValues, value: any) => void;
}

const DEFAULT_CERT_FORM: CertificationFormValues = {
  name: "",
  issuingOrg: "",
  issueDate: "",
  credentialUrl: "",
};

export default function CandidateCertificationsSection({
  certifications,
  onChange,
}: CandidateCertificationsSectionProps) {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Certification hook form
  const {
    control: certControl,
    handleSubmit: handleCertSubmit,
    reset: resetCert,
    formState: { errors: certErrors },
  } = useForm<CertificationFormValues>({
    defaultValues: DEFAULT_CERT_FORM,
  });

  const handleOpenCertModal = () => {
    resetCert(DEFAULT_CERT_FORM);
    setIsCertModalOpen(true);
  };

  const onSubmitCertification = (data: CertificationFormValues) => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      ...data,
    };
    onChange("certifications", [newCert, ...certifications]);
    setIsCertModalOpen(false);
    toast.success("Certification accreditation added!");
  };

  const handleDeleteCert = (id: string) => {
    onChange(
      "certifications",
      certifications.filter((c) => c.id !== id)
    );
    toast.success("Certification removed.");
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiAward className="size-4 text-forest" />
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Certifications & Industry Accreditations
          </h2>
        </div>

        <Button
          size="sm"
          onClick={handleOpenCertModal}
          className="gap-1.5"
        >
          <FiPlus className="size-3.5" />
          <span>Add Certificate</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-3.5 rounded-lg bg-zinc-50/60 border border-zinc-200/70 hover:border-zinc-300 transition-all flex items-start justify-between gap-2.5 group"
          >
            <div className="space-y-0.5 min-w-0 flex-1">
              <h4 className="text-xs font-bold text-zinc-900 truncate">
                {cert.name}
              </h4>
              <p className="text-[11px] text-zinc-500">{cert.issuingOrg}</p>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-0.5">
                <span>Issued {cert.issueDate}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-forest hover:underline font-semibold"
                  >
                    <span>Verify</span>
                    <FiExternalLink className="size-2.5" />
                  </a>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteCert(cert.id)}
              className="p-1 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
              title="Remove certification"
            >
              <FiTrash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Ant Design Modal for Adding Certification with CommonFieldset */}
      <Modal
        open={isCertModalOpen}
        onCancel={() => setIsCertModalOpen(false)}
        footer={null}
        centered
        width={520}
        destroyOnHidden
        closeIcon={<LuX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />}
        className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-0! overflow-hidden"
      >
        <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white">
          <h3 className="text-base font-bold text-zinc-900">Add Industry Certification</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Professional credentials and licenses</p>
        </div>

        <form onSubmit={handleCertSubmit(onSubmitCertification)} className="p-4 sm:p-5 space-y-3.5">
          <CommonFieldset<CertificationFormValues>
            control={certControl}
            register_as="name"
            label="Certificate Name"
            placeholder="e.g. AWS Certified Solutions Architect"
            isRequired={true}
            errors={certErrors}
            validationRules={{ required: "Certificate name is required" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CommonFieldset<CertificationFormValues>
              control={certControl}
              register_as="issuingOrg"
              label="Issuing Organization"
              placeholder="e.g. Amazon Web Services"
              isRequired={true}
              errors={certErrors}
              validationRules={{ required: "Issuing organization is required" }}
            />

            <CommonFieldset<CertificationFormValues>
              control={certControl}
              register_as="issueDate"
              label="Issue Date / Year"
              placeholder="e.g. 2023"
              isRequired={true}
              errors={certErrors}
              validationRules={{ required: "Issue date is required" }}
            />
          </div>

          <CommonFieldset<CertificationFormValues>
            control={certControl}
            register_as="credentialUrl"
            label="Credential Verification Link (Optional)"
            placeholder="https://aws.amazon.com/verification"
            errors={certErrors}
          />

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCertModalOpen(false)}
              className="border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
            >
              Save Certificate
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
