#!/usr/bin/env python3
"""
Almost Magic Tech Lab - Multi-Agent Orchestrator
DIGITAL OCEAN / ANY CLOUD VERSION - Uses Anthropic API directly

No AWS required! Works on Digital Ocean, Vercel, Railway, or any hosting.
"""

import os
import asyncio
from anthropic import Anthropic
from typing import Dict, List, Optional

class Agent:
    """Base agent class for Almost Magic orchestrator"""
    
    def __init__(self, name: str, description: str, instructions: str):
        self.name = name
        self.description = description
        self.instructions = instructions
        
    async def process(self, query: str, context: List[Dict] = None) -> str:
        """Process a query using this agent"""
        client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
        
        messages = context or []
        messages.append({
            "role": "user",
            "content": query
        })
        
        system_prompt = f"""You are {self.name}.

{self.instructions}

Your personality and expertise:
{self.description}

Respond naturally and helpfully based on your role."""

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=messages
        )
        
        return response.content[0].text


class SimpleOrchestrator:
    """
    Lightweight orchestrator that works with Anthropic API directly
    Perfect for Digital Ocean, Vercel, Railway, or any hosting
    """
    
    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self.client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
        
    def add_agent(self, agent: Agent):
        """Register an agent with the orchestrator"""
        self.agents[agent.name] = agent
        print(f"✅ Registered agent: {agent.name}")
        
    async def classify_intent(self, query: str) -> str:
        """Use Claude to determine which agent should handle the query"""
        
        agent_list = "\n".join([
            f"- {name}: {agent.description}" 
            for name, agent in self.agents.items()
        ])
        
        classification_prompt = f"""Given this user query, which agent should handle it?

Available agents:
{agent_list}

User query: "{query}"

Respond with ONLY the agent name, nothing else."""

        response = self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=50,
            messages=[{
                "role": "user",
                "content": classification_prompt
            }]
        )
        
        selected_agent = response.content[0].text.strip()
        
        # Match to actual agent name
        for agent_name in self.agents.keys():
            if agent_name.lower() in selected_agent.lower():
                return agent_name
                
        # Default to first agent if no match
        return list(self.agents.keys())[0]
        
    async def route_request(self, query: str, context: List[Dict] = None) -> Dict:
        """Route a request to the appropriate agent"""
        
        # Classify intent
        selected_agent_name = await self.classify_intent(query)
        selected_agent = self.agents[selected_agent_name]
        
        # Process with selected agent
        response = await selected_agent.process(query, context)
        
        return {
            "agent": selected_agent_name,
            "response": response
        }


async def main():
    """
    Demo of the Digital Ocean-friendly orchestrator
    """
    
    print("🎭 Almost Magic Tech Lab - Multi-Agent Orchestrator")
    print("🌊 DIGITAL OCEAN / ANTHROPIC API VERSION")
    print("=" * 60)
    
    # Check for API key
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("\n❌ ERROR: ANTHROPIC_API_KEY environment variable not set")
        print("\n📝 To fix this:")
        print("   export ANTHROPIC_API_KEY='your-api-key-here'")
        print("\n   Get your API key from: https://console.anthropic.com/")
        return
    
    # Initialize orchestrator
    orchestrator = SimpleOrchestrator()
    
    # ELAINE - Chief of Staff
    elaine = Agent(
        name="ELAINE",
        description="AI Chief of Staff for Almost Magic Tech Lab. Handles general coordination and routing.",
        instructions="""You are ELAINE, the AI Chief of Staff at Almost Magic Tech Lab.
        
Your role:
- Coordinate between specialized consultants
- Handle general business queries
- Provide warm, professional service with a touch of wit
- Route complex questions to specialists

Keep responses concise and actionable."""
    )
    
    # AI Strategy Consultant
    ai_strategy = Agent(
        name="AI-Strategy-Consultant",
        description="Expert in AI strategy, implementation, and ISO 42001 governance.",
        instructions="""You are an AI Strategy Consultant at Almost Magic Tech Lab.

Your expertise:
- AI strategy development and roadmaps
- ISO 42001 AI governance
- Use case identification and ROI analysis
- Ethical AI implementation
- Change management for AI adoption

Provide strategic, actionable advice grounded in industry best practices."""
    )
    
    # Cybersecurity Consultant
    cyber_consultant = Agent(
        name="Cybersecurity-Consultant",
        description="Expert in cybersecurity, ISO 27001, and security architecture.",
        instructions="""You are a Cybersecurity Consultant at Almost Magic Tech Lab.

Your expertise:
- ISO 27001 certification and compliance
- Security architecture and assessment
- Threat modeling and risk analysis
- CGEIT governance frameworks
- 20+ years of enterprise security experience

Provide security-first, compliance-aware recommendations."""
    )
    
    # Data Management Consultant
    data_consultant = Agent(
        name="Data-Management-Consultant",
        description="Expert in data strategy, governance, and analytics.",
        instructions="""You are a Data Management Consultant at Almost Magic Tech Lab.

Your expertise:
- Data architecture and strategy
- Data governance frameworks
- Analytics and business intelligence
- Data quality and master data management
- Enterprise data platforms

Provide practical, scalable data solutions."""
    )
    
    # Register all agents
    orchestrator.add_agent(elaine)
    orchestrator.add_agent(ai_strategy)
    orchestrator.add_agent(cyber_consultant)
    orchestrator.add_agent(data_consultant)
    
    print("\n" + "=" * 60)
    
    # Test queries
    test_queries = [
        "I need help developing an AI strategy for my e-commerce business",
        "How do I achieve ISO 27001 certification for my startup?",
        "What's the best way to organize our customer data?",
        "Tell me about Almost Magic Tech Lab"
    ]
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n🔍 Query {i}: {query}")
        print("-" * 60)
        
        try:
            result = await orchestrator.route_request(query)
            print(f"🤖 Selected Agent: {result['agent']}")
            print(f"💬 Response:\n{result['response']}\n")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}\n")
    
    print("=" * 60)
    print("✅ Demo complete!")
    print("\n💡 This orchestrator works on:")
    print("   - Digital Ocean")
    print("   - Vercel")
    print("   - Railway")
    print("   - Any cloud platform")
    print("   - Your own servers")
    print("\nNo AWS required! 🎉")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n👋 Orchestrator stopped")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
