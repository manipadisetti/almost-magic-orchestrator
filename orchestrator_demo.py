#!/usr/bin/env python3
"""
Almost Magic Tech Lab - Multi-Agent Orchestrator
Basic example to get you started

This demonstrates the core orchestration pattern for your AI consulting business.
"""

import asyncio
from multi_agent_orchestrator.orchestrator import MultiAgentOrchestrator
from multi_agent_orchestrator.agents import BedrockLLMAgent, BedrockLLMAgentOptions
from multi_agent_orchestrator.classifiers import BedrockClassifier, BedrockClassifierOptions

async def main():
    """
    Initialize and run the Almost Magic orchestrator
    """
    
    print("🎭 Almost Magic Tech Lab - Multi-Agent Orchestrator")
    print("=" * 60)
    
    # Initialize the orchestrator with Bedrock classifier
    orchestrator = MultiAgentOrchestrator(
        classifier=BedrockClassifier(
            BedrockClassifierOptions(
                model_id='anthropic.claude-sonnet-4-20250514'
            )
        )
    )
    
    # ELAINE - Chief of Staff Agent
    elaine = BedrockLLMAgent(BedrockLLMAgentOptions(
        name='ELAINE',
        description='''AI Chief of Staff for Almost Magic Tech Lab. 
        Handles general queries, coordination, and routing to specialized consultants.
        Personality: Professional, efficient, slightly witty.''',
        model_id='anthropic.claude-sonnet-4-20250514'
    ))
    
    # AI Strategy Consultant Agent
    ai_strategy_agent = BedrockLLMAgent(BedrockLLMAgentOptions(
        name='AI-Strategy-Consultant',
        description='''Expert in AI strategy, implementation, and governance.
        Helps businesses develop comprehensive AI strategies aligned with ISO 42001.
        Specializes in: AI roadmaps, use case identification, ROI analysis.''',
        model_id='anthropic.claude-sonnet-4-20250514'
    ))
    
    # Cybersecurity Consultant Agent
    cybersecurity_agent = BedrockLLMAgent(BedrockLLMAgentOptions(
        name='Cybersecurity-Consultant',
        description='''Expert in cybersecurity, ISO 27001, and security architecture.
        Helps businesses secure their systems and achieve compliance.
        Specializes in: Security assessments, compliance, threat modeling.''',
        model_id='anthropic.claude-sonnet-4-20250514'
    ))
    
    # Data Management Consultant Agent
    data_mgmt_agent = BedrockLLMAgent(BedrockLLMAgentOptions(
        name='Data-Management-Consultant',
        description='''Expert in data strategy, governance, and management.
        Helps businesses organize and leverage their data assets.
        Specializes in: Data architecture, governance frameworks, analytics.''',
        model_id='anthropic.claude-sonnet-4-20250514'
    ))
    
    # Register all agents
    orchestrator.add_agent(elaine)
    orchestrator.add_agent(ai_strategy_agent)
    orchestrator.add_agent(cybersecurity_agent)
    orchestrator.add_agent(data_mgmt_agent)
    
    print("\n✅ Orchestrator initialized with 4 agents:")
    print("   - ELAINE (Chief of Staff)")
    print("   - AI Strategy Consultant")
    print("   - Cybersecurity Consultant")
    print("   - Data Management Consultant")
    print("\n" + "=" * 60)
    
    # Example queries to demonstrate routing
    test_queries = [
        "I need help developing an AI strategy for my business",
        "How do I achieve ISO 27001 certification?",
        "What's the best way to organize my company's data?",
        "Tell me about Almost Magic Tech Lab"
    ]
    
    user_id = "demo-user"
    session_id = "demo-session-001"
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n🔍 Query {i}: {query}")
        print("-" * 60)
        
        try:
            # Route the request to the appropriate agent
            response = await orchestrator.route_request(
                user_input=query,
                user_id=user_id,
                session_id=session_id
            )
            
            print(f"🤖 Selected Agent: {response.metadata.agent_name}")
            print(f"💬 Response:\n{response.output}\n")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}\n")
    
    print("=" * 60)
    print("✅ Demo complete!")
    print("\n💡 Next steps:")
    print("   1. Configure your AWS credentials for Bedrock")
    print("   2. Customize agent descriptions for your use cases")
    print("   3. Add custom agents for your specific domains")
    print("   4. Integrate with your UI using ReactFlow")

if __name__ == "__main__":
    # Note: This requires AWS credentials configured
    # Set up: aws configure or environment variables
    try:
        asyncio.run(main())
    except Exception as e:
        print(f"\n❌ Setup required: {str(e)}")
        print("\n📝 To run this demo:")
        print("   1. Configure AWS credentials: aws configure")
        print("   2. Ensure Bedrock access is enabled in your AWS account")
        print("   3. Run: python3 orchestrator_demo.py")
