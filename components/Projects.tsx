"use client"
import React, {useState,useEffect} from "react";

import { getGithubData,fetchPinnedRepos } from "@/app/api/github/route";

interface repos{
    name:String,
    description:String | null,
}
const Projects:React.FC =()=>{
    const [repos,setRepos] = useState<repos[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const reposData = await fetchPinnedRepos();
                setRepos(reposData.props.json.data.user.pinnedItems.nodes);
            } catch (error) {
                console.error('Error fetching repos:', error);
            }
        };
        fetchData();
    },[])
    console.log(repos);
    return(
        <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((repo, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold">{repo.name}</h3>
                        <p className="text-gray-600">{repo.description || 'No description available'}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects;