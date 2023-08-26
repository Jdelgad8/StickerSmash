import { ACCESS_PRIVILEGES } from "constants";

export type AccessPrivilegesType = "all" | "limited" | "none" | undefined;

export interface PermissionsProps {
  accessPrivileges?: AccessPrivilegesType;
  canAskAgain?: boolean;
}

export type CheckPermissionArgsType<T> = {
  status: T | null;
  requestPermission: () => Promise<T>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const checkPermission = <T extends PermissionsProps>({
  status,
  requestPermission,
  setShowModal,
}: CheckPermissionArgsType<T>): void => {
  setShowModal(false);
  const noMediaPermission = status?.accessPrivileges === ACCESS_PRIVILEGES.NONE;
  const canRequestMediaPermission =
    !status || (noMediaPermission && status?.canAskAgain === true);
  if (canRequestMediaPermission) requestPermission();
  if (noMediaPermission && !canRequestMediaPermission) {
    setShowModal(true);
  }
};
