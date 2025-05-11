export async function getGithubData() {
    const res = await fetch('https://api.github.com/users/AadityaBajgain', {
        headers:{
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        },
        next: { revalidate: 600 },
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const repos = await res.json();

    return {
        props:{
            repos,
        }
    }
}