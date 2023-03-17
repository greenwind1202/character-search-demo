import { AVATAR_URL_PATH } from '../../../utils/Constant';
interface AvatarProps {
  id: number;
}
export function Avatar({ id }: AvatarProps) {
  return (
    <div className="flex items-center">
      <img className="h-10 w-10 rounded-full" src={AVATAR_URL_PATH.replace('{0}', id.toString())} alt="" />
    </div>
  );
}
