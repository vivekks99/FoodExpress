import React, { useState } from 'react'
import '../assets/css/profile.css'
import { BASE_URL, USER_URL } from '../constants';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import FormRow from '../components/FormRow';
import useFetchUser from '../hooks/useFetchUser';
import ErrorMessage from '../components/ErrorMessage';

function Profile() {
    const [editDisabled, setEditDisabled] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    
    const [user, isLoading, errorMessage, errorStatus, errorStatusText] = useFetchUser();

    function handleEdit(){
        setEditDisabled(false);
    }

    async function handleSave(){
        setIsSaving(true);
        const updatedUserDetails = {
            name: name || user.userDetails.name,
            phone: phone || user.userDetails.phone,
            address: address || user.userDetails.address
        }

        await fetch(`${BASE_URL}${USER_URL}/profile`, {
            method: "PATCH",
            body: JSON.stringify(updatedUserDetails),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setEditDisabled(true);
        setName('');
        setPhone('');
        setAddress('');
        setIsSaving(false);
    }

    function handleName(e){
        setName(e.target.value)
    }
    function handlePhone(e){
        setPhone(e.target.value)
    }
    function handleAddress(e){
        setAddress(e.target.value)
    }

    return (
        <>
        {isLoading ? <Spinner /> : errorMessage ? <ErrorMessage errorStatus={errorStatus} errorStatusText={errorStatusText} message={errorMessage} /> : <div className='profile-container'>
            <div className="profile-header">
                <h1>User Details</h1>
                <div className="profile-btns">
                    {editDisabled ? <Button styleClasses="primary" text="Edit" onClick={handleEdit} /> : <Button styleClasses="secondary" text={isSaving ? "Saving..." : "Save"} onClick={handleSave} />}
                </div>
            </div>
            <div className="profile-contents">
                <FormRow formLabel="Name" formValue={user.userDetails?.name} isDisabled={editDisabled} onChange={handleName} isRequired={true} />
                <FormRow formLabel="Email" formValue={user.userDetails?.email} isDisabled={true} onChange={null} isRequired={true} />
                <FormRow formLabel="Phone" formValue={user.userDetails?.phone} isDisabled={editDisabled} onChange={handlePhone} isRequired={false} />
                <FormRow formLabel="Address" formValue={user.userDetails?.address} isDisabled={editDisabled} onChange={handleAddress} isRequired={false} />
            </div>
        </div>}
        </>
    )
}

export default Profile