import { SelectionProfile, SelectionProps } from '@/types/selectionTypes';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';

export const SelectionMenu = <T extends SelectionProfile>({options, getKey, getSelectionText, onChange, headerText, placeholder}: SelectionProps<T>) => {
    return (
        <div className='border border-gray-300 rounded-md overflow-hidden bg-white'>
            {/*Select Header  */}
            <div className='bg-gray-50 px-4 py-2'>
                <h3 className='font-bold text-gray-800 text-sm tracking-wide'>
                    {headerText}
                </h3>
            </div>
            <Select.Root
                onValueChange={(key: string) => {
                    const opt = options.find((o: T) => getKey(o) === key);
                    if (opt) onChange(opt);
                }}
            >
                <Select.Trigger
                    className='
                    w-full px-4 py-3 text-left bg-white hover:bg-green-50 border-none
                    focus:outline-none focus:bg-green-100 flex items-center justify-between'
                >
                    <Select.Value placeholder={placeholder.label} />
                    <Select.Icon>
                        <ChevronDownIcon />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className='bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-50'
                    position='popper'>
                        <Select.ScrollUpButton className=''>
                            <ChevronUpIcon />
                        </Select.ScrollUpButton>
                        <Select.Viewport className=''>
                            {options.map((p: T, index: number) => (
                                <Select.Item key={getKey(p)} value={getKey(p)}
                                    className={`px-4 py-1.5 text-sm cursor-pointer hover:bg-[#c0d8b7] focus:outline-none flex items-center justify-between ${index % 2 === 0 ? 'bg-[#d9e7dd]' : 'bg-[#f1f7f2]'}`}
                                >
                                    <Select.ItemText>{getSelectionText(p)}</Select.ItemText>
                                    <Select.ItemIndicator className=''>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}
