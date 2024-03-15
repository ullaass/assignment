import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../store/formSlice';
import moment from 'moment';

const DynamicForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([{ id: Date.now(), value: '' }]);

  const userData = useSelector(state=> state.form.formData)

  console.log("userData",userData)

  const addAddress = () => {
    setAddresses([...addresses, { id: Date.now(), value: '' }]);
  };

  const removeAddress = (id) => {
    if (addresses.length === 1) {
      message.error('At least one address is required to proceed further');
      return;
    }
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const disabledDate = (current) => {
    return current && current > moment().subtract(18, 'years');
  };

  const onFinish = (values) => {
    const formData = {
      ...values,
      addresses: addresses.map(a => a.value),
    };
    dispatch(submitForm(formData));
    console.log("formData is",formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form
        form={form}
        name="dynamic_form"
        onFinish={onFinish}
        layout="vertical"
        className="w-full max-w-xl p-4 bg-white shadow-md rounded-lg"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Enter your name' }]}
          className="w-full"
        >
          <Input className="mt-1" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Enter your Phone Number' }]}
          className="w-full"
        >
          <Input className="mt-1" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Enter your Date Of Birth' }]}
          className="w-full"
        >
          <DatePicker className="w-full mt-1" disabledDate={disabledDate} />
        </Form.Item>
        <div className='flex flex-col max-h-60 overflow-auto no-scrollbar'>
        {addresses.map((address, index) => (
          <Form.Item
            label={`Address ${index + 1}`}
            key={address.id}
            className="w-full"
          >
            <div className="flex items-center space-x-2">
              <Input
                value={address.value}
                onChange={e => {
                  const newAddresses = [...addresses];
                  newAddresses[index].value = e.target.value;
                  setAddresses(newAddresses);
                }}
                className="flex-1 mt-1"
              />
              <Button className="flex-none" type="primary" onClick={() => addAddress()}>
                +
              </Button>
              <Button className="flex-none" danger onClick={() => removeAddress(address.id)}>
                -
              </Button>
            </div>
          </Form.Item>
        ))}
        </div>

        <Form.Item className="w-full">
          <Button type="primary" htmlType="submit" className="w-full mt-1 bg-violet-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DynamicForm;
