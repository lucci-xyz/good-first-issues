export interface Issue {
  id: number;
  title: string;
  url: string;
  repository: string;
  tags: string[];
  created_at: string;
  number: number;
  stars?: number;
  forks?: number;
}

export interface Quest extends Issue {
  labels?: string[];
  language?: string;
  owner?: string;
  hasBounty?: boolean;
}

// Helper to convert Issue to Quest
export function issueToQuest(issue: Issue): Quest {
  const [owner] = issue.repository.split('/');
  
  // Derive language from tags (simplified heuristic)
  const languageMap: Record<string, string> = {
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'python': 'Python',
    'rust': 'Rust',
    'go': 'Go',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'solidity': 'Solidity',
    'vyper': 'Vyper',
    'haskell': 'Haskell',
    'ocaml': 'OCaml',
    'elixir': 'Elixir',
  };
  
  const language = issue.tags.find(tag => languageMap[tag.toLowerCase()]);
  
  return {
    ...issue,
    labels: issue.tags, // Map tags to labels for now
    language: language ? languageMap[language.toLowerCase()] : undefined,
    owner,
    hasBounty: false, // No bounty data yet
  };
}

