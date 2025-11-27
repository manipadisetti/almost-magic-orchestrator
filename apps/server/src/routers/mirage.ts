import { z } from 'zod';
import { t } from '../router';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { vaporRequests } from '../db/schema';

export const mirageRouter = t.router({
  getGraph: t.procedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const { projectId } = input;
      
      // Fetch the project data from the database
      const project = await db.query.vaporRequests.findFirst({
        where: eq(vaporRequests.id, projectId),
      });
      
      if (!project) {
        throw new Error("Project not found");
      }
      
      const intentJson = project.intentJson;
      
      // Convert the intent JSON to React Flow nodes and edges
      const nodes = [];
      const edges = [];
      
      // Add project node as the central node
      nodes.push({
        id: 'project',
        type: 'project',
        position: { x: 0, y: 0 },
        data: { label: intentJson.project_name || 'Project' }
      });
      
      // Add entity nodes
      if (intentJson.entities && Array.isArray(intentJson.entities)) {
        intentJson.entities.forEach((entity, index) => {
          const angle = (2 * Math.PI * index) / intentJson.entities.length;
          const x = Math.cos(angle) * 300;
          const y = Math.sin(angle) * 300;
          
          const entityId = `entity-${index}`;
          nodes.push({
            id: entityId,
            type: 'entity',
            position: { x, y },
            data: { 
              label: entity.name || `Entity ${index}`,
              fields: entity.fields || []
            }
          });
          
          // Add edge from project to entity
          edges.push({
            id: `project-to-${entityId}`,
            source: 'project',
            target: entityId,
            type: 'smoothstep'
          });
        });
      }
      
      // Add feature nodes
      if (intentJson.features && Array.isArray(intentJson.features)) {
        intentJson.features.forEach((feature, index) => {
          const angle = (2 * Math.PI * index) / intentJson.features.length;
          const x = Math.cos(angle) * 500;
          const y = Math.sin(angle) * 500;
          
          const featureId = `feature-${index}`;
          nodes.push({
            id: featureId,
            type: 'feature',
            position: { x, y },
            data: { 
              label: feature.name || `Feature ${index}`,
              description: feature.description || ''
            }
          });
          
          // Add edge from project to feature
          edges.push({
            id: `project-to-${featureId}`,
            source: 'project',
            target: featureId,
            type: 'smoothstep'
          });
        });
      }
      
      return {
        nodes,
        edges,
        projectData: intentJson
      };
    }),
    
  updateGraph: t.procedure
    .input(z.object({
      projectId: z.string(),
      nodes: z.array(z.any()),
      edges: z.array(z.any()),
      projectData: z.any()
    }))
    .mutation(async ({ input }) => {
      const { projectId, nodes, edges, projectData } = input;
      
      // Update the project data in the database
      await db.update(vaporRequests)
        .set({
          intentJson: projectData,
          updatedAt: new Date()
        })
        .where(eq(vaporRequests.id, projectId));
      
      return {
        success: true,
        message: "Graph updated successfully"
      };
    })
});
