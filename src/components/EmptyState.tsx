import { ReactNode } from "react";
import { FiPackage } from "react-icons/fi";

interface Props { title?: string; message?: string; action?: ReactNode; icon?: ReactNode; }

const EmptyState = ({ title = "Nothing here yet", message = "Try adjusting your filters or search.", action, icon }: Props) => (
  <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
      {icon ?? <FiPackage className="h-7 w-7" />}
    </div>
    <h3 className="font-display text-2xl">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
