import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <main className="min-h-screen w-full md:grid md:grid-cols-2">
      <section className="relative hidden h-screen p-6 md:block">
        <Image
          src="/assets/background-auth.png"
          alt="background"
          width={300}
          height={500}
          className="h-full w-full rounded-3xl object-cover"
        />

        <div className="absolute w-full left-1/4 top-1/4 z-10">
          <Image src="/assets/logo.png" alt="logo" width={65} height={65} />
          <h2 className="mb-2 mt-4 text-3xl font-bold text-primary-900 lg:text-4xl">
            Get started with <br />
            <span
              className="mb-2 text-4xl  font-bold tracking-tight
             [-webkit-text-stroke:4px_white] 
             [paint-order:stroke_fill] 
             drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
            >
              <span className="text-primary-600">Rack</span>
              <span className="text-primary-900">IT</span>
            </span>
          </h2>
          <p className="font-light text-primary-900">
            Need something? We&lsquo;ve got a rack for that.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-8 md:px-10 lg:px-16">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-6 text-2xl font-bold text-primary-900 sm:text-3xl">
            Create an account
          </h1>

          <Input placeholder="Full Name" placeholderIcon="bx:user" fullWidth />
          <Input
            placeholder="Student ID Number"
            placeholderIcon="energy-icons:credit-card-20-bold"
            type="number"
            fullWidth
          />
          <Input
            placeholder="Phone Number"
            placeholderIcon="bx:phone"
            type="number"
            fullWidth
          />
          <Input
            placeholder="Email"
            placeholderIcon="codicon:mail"
            type="email"
            fullWidth
          />
          <Input
            placeholder="Password"
            placeholderIcon="bx:lock"
            type="password"
            fullWidth
          />
          <Input
            placeholder="Confirm Password"
            placeholderIcon="bx:lock"
            type="password"
            fullWidth
          />

          <Button fullWidth>Get Started</Button>

          <div className="mt-4 text-sm text-primary-900">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-primary-600 underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
