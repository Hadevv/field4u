import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import { ErrorBoundary } from "../../components/utils/ErrorBoundaries";
import { rehypePlugins, remarkPlugins } from "./markdown.config";

export type ServerMdxProps = {
  source: string;
  className?: string;
};

const MdxComponent = {} satisfies Record<string, React.ComponentType>;

export const ServerMdx = (props: ServerMdxProps) => {
  return (
    <ErrorBoundary>
      <div
        className={cn(
          "prose dark:prose-invert text-muted-foreground",
          props.className,
        )}
      >
        <Suspense fallback={<Loader />}>
          <RenderMdx {...props} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

const RenderMdx = (props: ServerMdxProps) => {
  // Vérifier si la source est vide ou undefined
  if (!props.source) {
    console.error("Source MDX vide ou non définie");
    return <div className="text-destructive">Contenu non disponible</div>;
  }

  try {
    return (
      <MDXRemote
        source={props.source}
        components={MdxComponent}
        options={{
          mdxOptions: {
            remarkPlugins: remarkPlugins,
            rehypePlugins: rehypePlugins,
            format: "mdx",
          },
        }}
      />
    );
  } catch (error) {
    console.error("Erreur lors du rendu MDX:", error);
    return (
      <div className="text-destructive">
        Une erreur est survenue lors du chargement du contenu
      </div>
    );
  }
};
