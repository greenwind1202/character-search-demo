import { classNames } from '../../../utils/Utils';
interface GenderProps {
  value: string;
}
export function Gender({ value }: GenderProps) {
  const status = value ? value.toLowerCase() : 'n/a';

  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-gray-100 text-gray-800',
        status.startsWith('male') ? 'bg-green-100 text-green-800' : null,
        status.startsWith('female') ? 'bg-yellow-100 text-yellow-800' : null,
        status.startsWith('n/a') ? 'bg-red-100 text-red-800' : null
      )}
    >
      {status}
    </span>
  );
}
