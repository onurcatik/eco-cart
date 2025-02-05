// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { getAllCategories } from '@/lib/actions/product.actions';
// import { SearchIcon } from 'lucide-react';

// const Search = async () => {
//   const categories = await getAllCategories();

//   return (
//     <form action='/search' method='GET'>
//       <div className='flex w-full max-w-sm items-center space-x-2'>
//       <Select name="category">
//   <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 cursor-default focus:outline-none">
//     <SelectValue placeholder="All" />
//   </SelectTrigger>
//   <SelectContent className="bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10 relative right-36">
//     <nav className="flex space-x-4 px-6 py-3">
//       <SelectItem
//         key="all"
//         value="all"
//         className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
//       >
//         All
//       </SelectItem>
//       {categories.map((category) => (
//         <SelectItem
//           key={category.category}
//           value={category.category}
//           className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
//         >
//           {category.category}
//         </SelectItem>
//       ))}
//     </nav>
//   </SelectContent>
// </Select>

//         <Input
//           name='q'
//           type='text'
//           placeholder='Search...'
//           className='md:w-[100px] lg:w-[300px]'
//         />
//         <Button>
//           <SearchIcon />
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default Search;


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { getAllCategories } from '@/lib/actions/product.actions';
import { SearchIcon } from 'lucide-react';

const Search = async () => {
  // const categories = await getAllCategories();

  return (
    <form action='/search' method='GET'>
      <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full max-w-md md:max-w-lg'>
      {/* <Select name="category">
   <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 cursor-default focus:outline-none">
     <SelectValue placeholder="All" />
   </SelectTrigger>
   <SelectContent className="bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10 relative right-36">
     <nav className="flex space-x-4 px-6 py-3">
       <SelectItem
         key="all"         value="all"
        className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
       >
         All
       </SelectItem>
       {categories.map((category) => (
         <SelectItem
           key={category.category}
           value={category.category}
           className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
         >
           {category.category}
         </SelectItem>
       ))}
     </nav>
   </SelectContent>
 </Select> */}

        <Input
          name='q'
          type='text'
          placeholder='Search products...'
          className='w-full md:w-72 lg:w-96 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
        <Button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;
