import React from 'react';
import Badge from '../common/Badge';
import {
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiCheckCircle,
} from 'react-icons/hi2';

export const AddressCard = ({
  address,
  selected = false,
  selectable = false,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  if (!address) return null;

  const {
    _id,
    fullName,
    phone,
    houseNumber,
    street,
    landmark,
    city,
    state,
    pinCode,
    country = 'India',
    isDefault,
  } = address;

  return (
    <div
      onClick={selectable && onSelect ? () => onSelect(address) : undefined}
      className={`relative p-5 rounded-2xl border transition-all duration-200 ${
        selectable ? 'cursor-pointer' : ''
      } ${
        selected
          ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-md'
          : 'border-slate-200/80 bg-white hover:border-slate-300 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-bold text-slate-900">{fullName}</h4>
          {isDefault && (
            <Badge variant="primary" size="sm">
              Default
            </Badge>
          )}
        </div>

        {selected && (
          <span className="text-indigo-600">
            <HiCheckCircle className="h-6 w-6" />
          </span>
        )}
      </div>

      <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
        <div className="flex items-start space-x-2">
          <HiOutlineMapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <span>
            {houseNumber}, {street}
            {landmark ? `, Near ${landmark}` : ''}, {city}, {state} - {pinCode}, {country}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-slate-700 font-semibold">
          <HiOutlinePhone className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <span>{phone}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
        <div>
          {!isDefault && onSetDefault && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSetDefault(_id);
              }}
              className="text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              Set as Default
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address);
              }}
              className="flex items-center space-x-1 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <HiOutlinePencilSquare className="h-4 w-4" />
              <span>Edit</span>
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(_id);
              }}
              className="flex items-center space-x-1 text-slate-500 hover:text-rose-600 transition-colors"
            >
              <HiOutlineTrash className="h-4 w-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
