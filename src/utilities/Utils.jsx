export function formatNumber(number){
    return number.toLocaleString("en-US")
}

export function splitId(id){
    const firstId = id.toString().slice(0, 3)
    const secondId = id.toString().slice(3, 6)
    return `${firstId}/${secondId}`
}

function compareByName(a, b) {
    return a.team_name.localeCompare(b.team_name)
}

function removeDuplicates(data, key){
    return [
        ...new Map(
            data.map(item => [key(item), item])
        ).values()
    ]
}