"use client"

import type { ChangeEvent, FormEvent } from "react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
 
 type Step = "input" | "confirm" | "complete"
 
type FormData = {
  companyName: string
  contactName: string
  postalCode: string
  address: string
  phone: string
  email: string
  inquiryType: string
  message: string
}

 
 const inquiryOptions = [
   "リバースエンジニアリング",
   "旧パーツや部品の復元",
   "オリジナル商品・ノベルティ部門",
   "その他",
 ]
 
 const requiredFields: Array<{ key: keyof FormData; label: string }> = [
   { key: "companyName", label: "会社名" },
   { key: "contactName", label: "担当者名" },
   { key: "postalCode", label: "郵便番号" },
   { key: "address", label: "住所" },
   { key: "phone", label: "電話番号" },
   { key: "email", label: "メールアドレス" },
   { key: "inquiryType", label: "お問い合わせ種別" },
   { key: "message", label: "内容" },
 ]
 
export function ContactForm() {
  const [step, setStep] = useState<Step>("input")
  const [formError, setFormError] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addressNotice, setAddressNotice] = useState("")
  const [consent, setConsent] = useState(false)
  const [files, setFiles] = useState<Array<File | null>>([null, null, null])
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
     postalCode: "",
     address: "",
     phone: "",
     email: "",
     inquiryType: "",
     message: "",
   })
 
  const fileLabels = useMemo(
    () =>
      files.map((file) => (file ? file.name : "選択されていません")),
    [files],
  )

  const normalizePostalCode = (value: string) => value.replace(/[^\d]/g, "")

  const fetchAddress = async (zipcode: string) => {
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`,
      )
      if (!response.ok) {
        throw new Error("zipcloud_error")
      }
      const data = (await response.json()) as {
        results?: Array<{
          address1: string
          address2: string
          address3: string
        }>
        message?: string | null
      }
      if (!data.results || data.results.length === 0) {
        setAddressNotice("該当する住所が見つかりませんでした。")
        return
      }
      const result = data.results[0]
      setFormData((prev) => ({
        ...prev,
        address: `${result.address1}${result.address2}${result.address3}`,
      }))
      setAddressNotice("")
    } catch {
      setAddressNotice("住所の自動入力に失敗しました。手入力をお願いします。")
    }
  }

  const updateField =
    (field: keyof FormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value
      setFormData((prev) => ({ ...prev, [field]: nextValue }))
      if (field === "postalCode") {
        const normalized = normalizePostalCode(nextValue)
        if (normalized.length === 7) {
          fetchAddress(normalized)
        } else {
          setAddressNotice("")
        }
      }
    }
 
  const handleFileChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextFile = event.target.files?.[0] ?? null
      setFiles((prev) => {
        const next = [...prev]
        next[index] = nextFile
        return next
      })
    }

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault()
     const missing = requiredFields.filter(
       ({ key }) => !formData[key].trim(),
     )
     if (missing.length || !consent) {
       setFormError("必須項目が未入力です。入力内容をご確認ください。")
       return
     }
     setFormError("")
     setStep("confirm")
   }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError("")
    try {
      const payload = new FormData()
      payload.set("companyName", formData.companyName)
      payload.set("contactName", formData.contactName)
      payload.set("postalCode", formData.postalCode)
      payload.set("address", formData.address)
      payload.set("phone", formData.phone)
      payload.set("email", formData.email)
      payload.set("inquiryType", formData.inquiryType)
      payload.set("message", formData.message)
      files.forEach((file, index) => {
        if (file) {
          payload.set(`file${index}`, file)
        }
      })
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      })
      if (!response.ok) {
        throw new Error("send_failed")
      }
      setStep("complete")
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }
 
   if (step === "complete") {
     return (
       <div className="rounded-lg border border-border bg-card p-8 text-center">
         <h2 className="text-lg font-semibold text-foreground">
           {"送信が完了しました"}
         </h2>
         <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
           {
             "お問い合わせ内容を受け付けました。内容を確認のうえ、担当者よりご連絡いたします。"
           }
         </p>
         <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
           {"※数営業日以内に返信がない場合はお手数ですが再度ご連絡ください。"}
         </p>
         <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">{ "トップへ戻る" }</Link>
          </Button>
         </div>
       </div>
     )
   }
 
   return (
     <div className="rounded-lg border border-border bg-card p-6 md:p-8">
       <div className="mb-6 flex flex-col gap-2">
         <h2 className="text-lg font-semibold text-foreground">
           {step === "confirm" ? "入力内容の確認" : "お問い合わせフォーム"}
         </h2>
         <p className="text-sm text-muted-foreground">
           {step === "confirm"
             ? "内容に誤りがないかご確認ください。"
             : "必要事項をご入力のうえ、確認画面へお進みください。"}
         </p>
       </div>
 
       {step === "input" ? (
        <form onSubmit={handleConfirm} className="space-y-6">
          {formError && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {formError}
            </div>
          )}
 
           <FieldGroup label="会社名" required>
             <Input
               value={formData.companyName}
               onChange={updateField("companyName")}
               placeholder="例）別役ロボット工業株式会社"
               required
             />
           </FieldGroup>

           <FieldGroup label="担当者名" required>
             <Input
               value={formData.contactName}
               onChange={updateField("contactName")}
               placeholder="例）山田 太郎"
               required
             />
           </FieldGroup>
 
           <FieldGroup label="住所" required>
             <div className="space-y-3">
               <div className="flex items-center gap-2">
                 <span className="text-sm text-muted-foreground">〒</span>
                <Input
                  className="flex-1"
                  value={formData.postalCode}
                  onChange={updateField("postalCode")}
                  placeholder="例）367-0212"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {"※郵便番号をご入力頂くと住所が自動入力されます。"}
              </p>
              {addressNotice && (
                <p className="text-xs text-destructive">{addressNotice}</p>
              )}
              <Input
                value={formData.address}
                onChange={updateField("address")}
                placeholder="例）埼玉県本庄市児玉町児玉 1732-1"
                required
              />
             </div>
           </FieldGroup>
 
           <FieldGroup label="電話番号" required>
             <Input
               value={formData.phone}
               onChange={updateField("phone")}
               placeholder="例）0495-71-6824"
               required
             />
           </FieldGroup>
 
           <FieldGroup label="メールアドレス" required>
             <Input
               type="email"
               value={formData.email}
               onChange={updateField("email")}
               placeholder="例）h-betchaku@brinet.co.jp"
               required
             />
           </FieldGroup>
 
           <div className="space-y-3">
             <Label className="text-sm font-semibold text-foreground">
               {"添付ファイル"}
             </Label>
             <div className="space-y-3">
               {fileLabels.map((label, index) => {
                 const inputId = `file-${index}`
                 return (
                   <div
                     key={inputId}
                     className="flex flex-wrap items-center gap-3 rounded-md border border-input bg-background px-3 py-2"
                   >
                     <span className="text-sm text-muted-foreground">
                       {label}
                     </span>
                     <input
                       id={inputId}
                       type="file"
                       className="sr-only"
                       onChange={handleFileChange(index)}
                     />
                      <Label
                        htmlFor={inputId}
                        className="ml-auto cursor-pointer text-sm text-foreground/70 hover:text-foreground/90 hover:underline"
                      >
                        {"ファイルを選択"}
                      </Label>
                   </div>
                 )
               })}
             </div>
             <p className="text-xs text-muted-foreground">
               {"※添付ファイルは3MBまで（最大3件）です。"}
             </p>
           </div>
 
           <div className="space-y-3">
             <Label className="text-sm font-semibold text-foreground">
               <span>{"お問い合わせ種別"}</span>
               <RequiredMark />
             </Label>
             <RadioGroup
               value={formData.inquiryType}
               onValueChange={(value) =>
                 setFormData((prev) => ({ ...prev, inquiryType: value }))
               }
               className="gap-3"
             >
               {inquiryOptions.map((option) => {
                 const optionId = `inquiry-${option}`
                 return (
                   <div key={option} className="flex items-center gap-3">
                     <RadioGroupItem value={option} id={optionId} />
                     <Label htmlFor={optionId} className="text-sm">
                       {option}
                     </Label>
                   </div>
                 )
               })}
             </RadioGroup>
           </div>
 
           <FieldGroup label="内容" required>
             <Textarea
               value={formData.message}
               onChange={updateField("message")}
               placeholder={
                 "例）\n対象物：○○（素材・サイズ）\n目的：復元 / 試作 / 干渉確認\n希望納期：○月○日頃\n図面/データ：有（形式：STL）/ 無"
               }
               rows={5}
               required
             />
             <p className="text-xs text-muted-foreground">
               {"※詳細な検討のため、対象物の素材・サイズ・目的を記載してください。"}
             </p>
           </FieldGroup>
 
            <div className="space-y-3">
             <div className="flex items-start gap-3">
               <Checkbox
                 id="consent"
                 checked={consent}
                 className="mt-1"
                 onCheckedChange={(checked) =>
                   setConsent(checked === true)
                 }
               />
               <Label
                 htmlFor="consent"
                 className="text-sm leading-relaxed"
               >
                 {"モデリングにあたっての注意事項に合意する"}
                 <RequiredMark />
                 <span className="ml-2 text-muted-foreground">
                  <Link
                    href="/notice"
                    className="text-foreground/70 hover:text-foreground/90 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"注意事項を確認"}
                  </Link>
                 </span>
               </Label>
             </div>
           </div>
 
           <div className="flex flex-wrap justify-end gap-3">
             <Button type="submit" size="lg">
               {"確認へ進む"}
             </Button>
           </div>
         </form>
       ) : (
         <div className="space-y-6">
           <SummaryRow label="会社名" value={formData.companyName} />
           <SummaryRow label="担当者名" value={formData.contactName} />
           <SummaryRow
             label="住所"
             value={`〒${formData.postalCode} ${formData.address}`}
           />
           <SummaryRow label="電話番号" value={formData.phone} />
           <SummaryRow label="メールアドレス" value={formData.email} />
           <SummaryRow
             label="添付ファイル"
             value={fileLabels.map((label, index) => (
               <span key={`file-label-${index}`} className="block">
                 {label}
               </span>
             ))}
           />
           <SummaryRow label="お問い合わせ種別" value={formData.inquiryType} />
           <SummaryRow label="内容" value={formData.message} />
           <SummaryRow label="注意事項同意" value="合意する" />

           {submitError && (
             <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
               {submitError}
             </div>
           )}

           <div className="flex flex-wrap justify-end gap-3">
             <Button
               type="button"
               variant="outline"
               onClick={() => setStep("input")}
             >
               {"戻る"}
             </Button>
             <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
               {isSubmitting ? "送信中..." : "送信する"}
             </Button>
           </div>
         </div>
       )}
     </div>
   )
 }
 
 function FieldGroup({
   label,
   required,
   children,
 }: {
   label: string
   required?: boolean
   children: React.ReactNode
 }) {
   return (
     <div className="space-y-2">
       <Label className="text-sm font-semibold text-foreground">
         {label}
         {required && <RequiredMark />}
       </Label>
       {children}
     </div>
   )
 }
 
 function RequiredMark() {
   return <span className="ml-1 text-primary">*</span>
 }
 
 function SummaryRow({
   label,
   value,
 }: {
   label: string
   value: React.ReactNode
 }) {
   return (
     <div className="space-y-1 border-b border-border pb-4">
       <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
         {label}
       </div>
       <div className={cn("text-sm leading-relaxed text-foreground")}>
         {value}
       </div>
     </div>
   )
 }
