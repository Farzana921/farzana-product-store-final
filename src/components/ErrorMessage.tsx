import { FiAlertCircle } from "react-icons/fi";

interface Props { title?: string; message?: string; onRetry?: () => void; }

const ErrorMessage = ({ title = "Something went wrong", message = "We couldn't load this content. Please try again.", onRetry }: Props) => (
  <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-border bg-card p-10 text-center luxury-shadow">
    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <FiAlertCircle className="h-7 w-7" />
    </div>
    <h3 className="font-display text-2xl">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-foreground/85">
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;
