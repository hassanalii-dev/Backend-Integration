import { NavLink } from "react-router";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">

      <div className="w-full max-w-3xl">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome
          </h1>

          <p className="text-slate-400">
            Create an account or login to continue
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <NavLink
            to="/login"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-1 hover:border-emerald-500"
          >

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <span className="text-xl">
                →
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-2">
              Login
            </h2>

            <p className="text-slate-400">
              Already have an account? Login here.
            </p>

            <div className="mt-6 text-emerald-400 font-medium">
              Continue →
            </div>

          </NavLink>

          <NavLink
            to="/signup"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-1 hover:border-emerald-500"
          >

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <span className="text-xl">
                +
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-2">
              Sign Up
            </h2>

            <p className="text-slate-400">
              Don't have an account? Create one here.
            </p>

            <div className="mt-6 text-emerald-400 font-medium">
              Create Account →
            </div>

          </NavLink>

        </div>

      </div>

    </div>
  );
}

export default App;