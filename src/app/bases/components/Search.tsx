import { types } from '@/data/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Button } from '@/app/components/ui/button';

interface SelectProps {
  placeholder: string;
  onClick: (e: any) => void;
}

type types = {
  id?: number;
  name: string;
  value: string;
};

const Select: React.FC<SelectProps> = ({ placeholder, onClick }) => {
  const handleClick = (e: any, item: types) => {
    e.target.item = {
      value: item.value,
      name: item.name,
    };
    onClick(e);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="mt-4 p-6 ">
          {placeholder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel
          className="cursor-pointer"
          onClick={(e) => handleClick(e, { name: '', value: '' })}
        >
          Types(click to deselect)
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {types.map((item: types) => (
          <DropdownMenuItem key={item.id} onClick={(e) => handleClick(e, item)}>
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Select;
