export function formatNumber(number){
    return number.toLocaleString("en-US")
}

function compareByName(a, b) {
    return a.team_name.localeCompare(b.team_name);
}

function removeDuplicates(data, key){
    return [
        ...new Map(
            data.map(item => [key(item), item])
        ).values()
    ]
}