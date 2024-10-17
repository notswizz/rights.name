import Image from 'next/image';

export const isImageUrl = (url) => {
  return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif') || url.endsWith('.webp'));
};

export const renderCell = (cell, header) => {
  if (header === 'Agency' && cell === 'ISE') {
    return (
      <div className="w-16 h-16 relative overflow-hidden shadow-lg border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105">
        <Image
          src="/ise.jpeg"
          alt="ISE Logo"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    );
  } else if (isImageUrl(cell)) {
    return (
      <div className="w-16 h-16 relative rounded-full overflow-hidden shadow-lg border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105">
        <Image
          src={cell}
          alt={`Image for ${header}`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    );
  } else {
    switch (header) {
      case 'Annual':
        return <span>💸 {cell}</span>;
      case 'Total':
        return <span>💰 {cell}</span>;
      case 'Signed':
        return <span>✍️ {cell}</span>;
      case 'Length':
        return <span>🗓️ {cell}</span>;
      default:
        return cell;
    }
  }
};

export const filterData = (data, searchTerm) => {
  return data.slice(1).filter(row =>
    row.some(cell =>
      cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const sortData = (filteredData, sortConfig, headers) => {
  let sortableItems = [...filteredData];
  if (sortConfig.key !== null) {
    sortableItems.sort((a, b) => {
      const index = headers.indexOf(sortConfig.key);
      if (a[index] < b[index]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[index] > b[index]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
  return sortableItems;
};