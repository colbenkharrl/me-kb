import { Context, FC } from "react";

type ContextOverwriterProps = {
  Context: Context<any>;
  newValues: Record<string, any>;
};

export const ContextOverwriter: FC<ContextOverwriterProps> = ({
  Context,
  newValues,
  children,
}) => {
  return (
    <Context.Consumer>
      {(context: any) => (
        <Context.Provider value={{ ...context, ...newValues }}>
          {children}
        </Context.Provider>
      )}
    </Context.Consumer>
  );
};
