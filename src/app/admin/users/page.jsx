import UserAdmin from "@/components/admin/userAdmin/userAdmin";

export default function UsersPage() {

    return (
        <>
            <h4 style={{fontSize: '24px', textAlign: 'center', marginTop: '12px', fontWeight: 'bolder'}}>Usuarios</h4>
            <UserAdmin />
        </>
    )
}