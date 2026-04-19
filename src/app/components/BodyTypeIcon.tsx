import {
  CarIcon,
  CarProfileIcon,
  CarSimpleIcon,
  LightningIcon,
  TruckIcon,
  VanIcon,
} from "@phosphor-icons/react";
import type { BodyTypeIconKey } from "../../types";

interface BodyTypeIconProps {
  iconKey: BodyTypeIconKey;
  className?: string;
}

export default function BodyTypeIcon({
  iconKey,
  className = "h-8 w-8",
}: BodyTypeIconProps) {
  if (iconKey === "suv") {
    return <CarProfileIcon className={className} weight="duotone" />;
  }

  if (iconKey === "sedan") {
    return <CarIcon className={className} weight="duotone" />;
  }

  if (iconKey === "picape") {
    return <TruckIcon className={className} weight="duotone" />;
  }

  if (iconKey === "utilitario") {
    return <VanIcon className={className} weight="duotone" />;
  }

  if (iconKey === "eletrico") {
    return <LightningIcon className={className} weight="duotone" />;
  }

  return <CarSimpleIcon className={className} weight="duotone" />;
}
