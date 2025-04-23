import { useRouter } from "next/navigation";

export default function RegisterForm({ handleOnSubmit, handleOnChange, dataUser }) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/login");
    };

    return (
        <form onSubmit={handleOnSubmit} className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
            <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">Nombre</label>
                <input
                    type="text"
                    name="first_name"
                    value={dataUser.first_name}
                    onChange={handleOnChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">Apellido</label>
                <input
                    type="text"
                    name="last_name"
                    value={dataUser.last_name}
                    onChange={handleOnChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="age" className="block text-sm font-semibold text-gray-700">Edad</label>
                <input
                    type="number"
                    name="age"
                    value={dataUser.age}
                    onChange={handleOnChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={dataUser.email}
                    onChange={handleOnChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={dataUser.password}
                    onChange={handleOnChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Enviar
            </button>

            <div className="mt-4 text-center">
                <strong>Tiene una cuenta?</strong>
                <button
                    onClick={handleRedirect}
                    className="ml-2 text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Iniciar Sesión
                </button>
            </div>
        </form>
    );
}
