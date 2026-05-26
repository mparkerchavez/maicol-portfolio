import { Switch, Route, Router as WouterRouter } from "wouter";
import { LlamitaPlaceholder } from "@/components/site/llamita-placeholder";
import HomePage from "@/pages/home";
import CaseStudyPage from "@/pages/work/slug";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/work/:slug" component={CaseStudyPage} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h1">404</h1>
            <p className="mt-4 text-muted">Page not found.</p>
            <a href="/" className="mt-6 block text-mono">{"<-"} BACK TO HOME</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
      <LlamitaPlaceholder />
    </WouterRouter>
  );
}

export default App;
