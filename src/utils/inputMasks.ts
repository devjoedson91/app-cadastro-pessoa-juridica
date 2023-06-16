export const normalizeCnpjNumber = (value: String | undefined) => {
    if (!value) return ''
    
    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export const normalizeCpfNumber = (value: String | undefined) => {
    if (!value) return ''
    
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

export const normalizeCepNumber = (value: String | undefined) => {
    if (!value) return ''
    return value.replace(/\D/g, "")
        .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
        .replace(/(-\d{3})(\d+?)/, '$1')    
}

export const normalizePhoneNumber = (value: String | undefined) => {
    if (!value) return ''
    
    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1')
}

export const normalizeDate = (value: String | undefined) => {
    if (!value) return ''
    
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1")

}

export const normalizeCapitalValue = (value: string | undefined) => {
    if (!value) return ''
    
    return (Number(value.replace(/\D/g, "")) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

}