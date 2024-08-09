import { useState } from 'react';

export default function useSelectItemTable() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleClickSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = <T extends { id: string }>(
    event: React.ChangeEvent<HTMLInputElement>,
    data: T[]
  ) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return {
    selected,
    isSelected,
    setSelected,
    handleClickSelect,
    handleSelectAllClick,
  };
}
