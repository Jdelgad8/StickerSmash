export interface PermissionsProps {
  granted?: boolean;
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
  const noMediaPermission = status?.granted === false;
  const canRequestMediaPermission =
    !status || (noMediaPermission && status?.canAskAgain === true);
  if (canRequestMediaPermission) {
    requestPermission();
  }
  if (noMediaPermission && !canRequestMediaPermission) {
    setShowModal(true);
  }
};
