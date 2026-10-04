import { services } from "@/lib/services";
import { PracticeIndex } from "@/components/practice-index";
export function ServiceGrid() {
  return (
    <PracticeIndex
      services={services.map(({ slug, shortTitle, intro }) => ({
        slug,
        title: shortTitle,
        intro,
      }))}
    />
  );
}
