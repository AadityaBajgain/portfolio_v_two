export async function getGithubData() {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    if (!token) {
        throw new Error('GitHub token is not configured');
    }

    const res = await fetch('https://api.github.com/users/AadityaBajgain/repos', {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 600 },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`GitHub API error: ${res.status} - ${error}`);
    }

    const repos = await res.json();
    return { props: { repos } };
}