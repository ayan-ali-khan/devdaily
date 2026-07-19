"use client";
import { useState } from "react";
import { z} from "zod";

const signupSchema = z.object({
    username: z.string().min(3, "Username must be atleast 3 char long"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(6, "Password must  atleast 6 char long")
        .regex(/[A-Z]/, "Password must contain uppercase letter")
        .regex(/[0-9]/, "password must contain a number")
})

type SignupForm = z.infer<typeof signupSchema>;
type FieldErrors = Partial<Record<keyof SignupForm, string>>;

export default function FormValidatorPage(){
    const [form, setForm] = useState<SignupForm>({
        username: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<FieldErrors>({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(field: keyof SignupForm, value: string){
        setForm((prev: any) => ({...prev, [field]: value}));
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setSubmitted(false);
        
        const result = signupSchema.safeParse(form);

        if(!result.success){
            const fieldErrors: FieldErrors = {};
            for(const issue of result.error.issues){
                const field = issue.path[0] as keyof SignupForm;
                if(!fieldErrors[field]) fieldErrors[field]= issue.message;
            }
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        setSubmitted(true);
    }

    return(
        <main className="max-w-md mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">
                Form Validator
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="">
                    <input 
                        value={form.username}
                        placeholder="Enter Username"
                        onChange={(e) => handleChange("username", e.target.value)}
                        className="w-full border rounded px-3 py-2" 
                    />
                    {errors.username && 
                    (<p className="text-red-600 text-xs mt-1">{errors.username}</p>)}
                </div>

                <div className="">
                    <input 
                        value={form.email}
                        placeholder="Enter valid email"
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full border rounded px-3 py-2" 
                    />
                    {errors.email && 
                    (<p className="text-red-600 text-xs mt-1">{errors.email}</p>)}
                </div>

                <div className="">
                    <input 
                        value={form.password}
                        placeholder="Enter Password(min 6 char)"
                        onChange={(e) => handleChange("password", e.target.value)}
                        className="w-full border rounded px-3 py-2" 
                    />
                    {errors.password && 
                    (<p className="text-red-600 text-xs mt-1">{errors.password}</p>)}
                </div>

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded w-full hover:opacity-90"
                >
                    SignUp
                </button>

                {submitted && (
                    <p className="text-green-600 text-sm mt-2">
                        Valid! (nothing is actually submitted anywhere, this is just a demo)
                    </p>
                )}
            </form>
        </main>
    )
}