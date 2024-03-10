export const DivisionSelector = ({ divisions, onSelectDivision }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[45%]">
      <label className="block text-sm font-medium text-gray-700 py-">
        My divisions
      </label>
      <select
        onChange={(e) => onSelectDivision(e.target.value)}
        className="border pl-3 py-2 rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value="">Select Division</option>
        {divisions.map((division) => (
          <option key={division.value} value={division.name}>
            {division.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DistrictSelector = ({ districts, onSelectDistrict }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[45%]">
      <label className=" block text-sm font-medium text-gray-700">
        My district
      </label>
      <select
        onChange={(e) => onSelectDistrict(e.target.value)}
        className="border pl-3  py-2 rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value="">Select District</option>
        {districts &&
          districts.map((district) => (
            <option key={district.name} value={district.name}>
              {district.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export const UpazilaSelector = ({ upazilas, onSelectUpazila }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[45%]">
      <label className="py-1 block text-sm font-medium text-gray-700">
        My upazila
      </label>
      <select
        onChange={(e) => onSelectUpazila(e.target.value)}
        className="border pl-3  py-2 rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value="" className="pb-2">
          Select Upazila
        </option>
        {upazilas.map((upazila) => (
          <option key={upazila} value={upazila} className="py-2 custom-option">
            {upazila}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DivisionS = ({ divisions, onSelectDivision }) => {
  return (
    <div className="flex flex-col w-[98%] lg:w-[48%]">
      <label className="block text-sm font-medium text-gray-700 py-">
        My divisions
      </label>
      <select
        onChange={(e) => onSelectDivision(e.target.value)}
        className="border pl-3 py-[6px] rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value="">Select Division</option>
        {divisions.map((division) => (
          <option key={division.value} value={division.name}>
            {division.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const District = ({ districts, onSelectDistrict }) => {
  return (
    <div className="flex flex-col w-[98%] lg:w-[48%]">
      <label className=" block text-sm font-medium text-gray-700">
        My district
      </label>
      <select
        onChange={(e) => onSelectDistrict(e.target.value)}
        className="border pl-3  py-[6px] rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value="">Select District</option>
        {districts &&
          districts.map((district) => (
            <option key={district.name} value={district.name}>
              {district.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export const Upazila = ({ upazilas, onSelectUpazila }) => {
  return (
    <div className="flex flex-col w-[98%] lg:w-[48%]">
      <label className="py-1 block text-sm font-medium text-gray-700">
        My upazila
      </label>
      <select
        onChange={(e) => onSelectUpazila(e.target.value)}
        className="border pl-3  py-[6px] rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value="" className="pb-2">
          Select Upazila
        </option>
        {upazilas.map((upazila) => (
          <option key={upazila} value={upazila} className="py-2 custom-option">
            {upazila}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};
