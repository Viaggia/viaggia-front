import React, { useEffect, useState } from 'react';
import { User, UpdateUserDTO } from '../../../types/User';
import { updateUser } from '../../../services/userService';

interface Props {
    user: User;
    role: string;
}

const getFieldsByRole = (role: string) => {
    switch (role) {
        case 'CLIENT':
            return [
                { key: 'name', label: 'Nome' },
                { key: 'email', label: 'Email' },
                { key: 'phoneNumber', label: 'Telefone' },
                { key: 'cpf', label: 'CPF' },
            ];
        case 'SERVICE_PROVIDER':
            return [
                { key: 'name', label: 'Nome' },
                { key: 'email', label: 'Email' },
                { key: 'phoneNumber', label: 'Telefone' },
                { key: 'cpf', label: 'CPF' },
                { key: 'companyName', label: 'Empresa' },
                { key: 'companyLegalName', label: 'Razão Social' },
            ];
        case 'ATTENDANT':
            return [
                { key: 'name', label: 'Nome' },
                { key: 'email', label: 'Email' },
                { key: 'phoneNumber', label: 'Telefone' },
                { key: 'employerCompanyName', label: 'Empresa Empregadora' },
                { key: 'employeeId', label: 'ID do Funcionário' },
            ];
        case 'ADMIN':
        default:
            return [
                { key: 'name', label: 'Nome' },
                { key: 'email', label: 'Email' },
                { key: 'phoneNumber', label: 'Telefone' },
            ];
    }
};

const ProfileUserInfoCard: React.FC<Props> = ({ user, role }) => {
     const fields = getFieldsByRole(role);

    const [editField, setEditField] = useState<string | null>(null);
    const [form, setForm] = useState<UpdateUserDTO>({
        name: user.name,
        phoneNumber: user.phoneNumber,
        cpf: user.cpf,
        companyName: user.companyName,
        companyLegalName: user.companyLegalName,
    });
    const [loading, setLoading] = useState(false);
    const [localUser, setLocalUser] = useState<User>(user);

    useEffect(() => {
        setForm({
            name: localUser.name,
            phoneNumber: localUser.phoneNumber,
            cpf: localUser.cpf,
            companyName: localUser.companyName,
            companyLegalName: localUser.companyLegalName,
        });
    }, [localUser]);

    const handleEdit = (key: string) => setEditField(key);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (key: string) => {
        setLoading(true);
        try {
            const updated = await updateUser(user.id, form);
            setLocalUser(updated); // Atualiza o estado local com o retorno do backend
            setEditField(null);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Perfil do Usuário</h4>
            </div>
            <div className="card-body">
                {fields.map(({ key, label }) => {
                    const value = localUser[key as keyof User];
                    if (typeof value === 'object') return null;
                    return (
                        <div className="row mb-3" key={key}>
                            <div className="col-md-6 d-flex align-items-center">
                                <strong>{label}:</strong>
                                {key === 'email' ? (
                                    <span className="ms-2">{value || <span className="text-muted">Não informado</span>}</span>
                                ) : editField === key ? (
                                    <>
                                        {key === 'avatar' ? (
                                            <input
                                                type="file"
                                                className="form-control ms-2"
                                                name={key}
                                                onChange={handleChange}
                                                disabled={loading}
                                                style={{ maxWidth: 200 }}
                                                accept="image/*"
                                            />
                                        ) : (
                                            <input
                                                className="form-control ms-2"
                                                name={key}
                                                value={typeof form[key as keyof UpdateUserDTO] === 'string' ? form[key as keyof UpdateUserDTO] as string : ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                                style={{ maxWidth: 200 }}
                                            />
                                        )}
                                        <button
                                            className="btn btn-success btn-sm ms-2"
                                            onClick={() => handleSave(key)}
                                            disabled={loading}
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm ms-2"
                                            onClick={() => setEditField(null)}
                                            disabled={loading}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="ms-2">{value || <span className="text-muted">Não informado</span>}</span>
                                        <button
                                            className="btn btn-link btn-sm ms-2 p-0"
                                            onClick={() => handleEdit(key)}
                                            title="Editar"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileUserInfoCard;