
const AddressForm = ({ title, address, onChange }) => {
    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={address.first_name}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={address.last_name}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="company"
                placeholder="Company"
                value={address.company}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="address_1"
                placeholder="Address Line 1"
                value={address.address_1}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="address_2"
                placeholder="Address Line 2"
                value={address.address_2}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={address.phone}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                value={address.postcode}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={address.email}
                onChange={onChange}
                className="w-full p-2 border rounded-md mt-2"
            />
        </div>
    );
};

export default AddressForm;
